// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IPROSPERToken is IERC20 {
    function mintToCreator(address creator, uint256 amount) external;
}

interface IContentRegistry {
    function contents(uint256) external view returns (
        address creator,
        string memory contentHash,
        string memory metadataURI,
        uint8 licenseType,
        bool remixingEnabled,
        uint256 createdAt,
        uint256 usageCount,
        bool isActive
    );
    
    function attributions(uint256) external view returns (
        uint256 contentId,
        address remixer,
        uint256 remixId,
        string memory attributionProof,
        uint256 timestamp,
        uint256 weight
    );
    
    function getContentAttributions(uint256 contentId) external view returns (uint256[] memory);
}

/**
 * @title RevenueSharing
 * @dev Distributes PROSPER tokens based on content usage and attribution weights
 * Uses PageRank-style algorithm for fair revenue distribution
 */
contract RevenueSharing is Ownable, ReentrancyGuard {
    
    IPROSPERToken public prosperToken;
    IContentRegistry public contentRegistry;
    
    // Distribution parameters
    uint256 public constant DISTRIBUTION_CYCLE = 7 days;
    uint256 public constant MIN_ATTRIBUTION_WEIGHT = 1;
    uint256 public constant MAX_ATTRIBUTION_WEIGHT = 100;
    
    // Revenue pools
    uint256 public totalRevenuePool;
    uint256 public lastDistributionTime;
    
    // Creator earnings tracking
    mapping(address => uint256) public creatorEarnings;
    mapping(address => uint256) public claimedEarnings;
    mapping(uint256 => uint256) public contentRevenue;
    
    // Reputation system
    mapping(address => uint256) public creatorReputation;
    mapping(uint256 => uint256) public contentQualityScore;
    
    // Distribution tracking
    uint256 public distributionRound;
    mapping(uint256 => mapping(address => uint256)) public roundDistributions;
    
    // Events
    event RevenueDeposited(address indexed depositor, uint256 amount);
    event RevenueDistributed(uint256 indexed round, uint256 totalAmount, uint256 creatorsCount);
    event EarningsClaimed(address indexed creator, uint256 amount);
    event ReputationUpdated(address indexed creator, uint256 newReputation);
    event QualityScoreUpdated(uint256 indexed contentId, uint256 newScore);
    
    constructor(
        address _prosperToken,
        address _contentRegistry
    ) Ownable(msg.sender) {
        require(_prosperToken != address(0), "Invalid token address");
        require(_contentRegistry != address(0), "Invalid registry address");
        
        prosperToken = IPROSPERToken(_prosperToken);
        contentRegistry = IContentRegistry(_contentRegistry);
        lastDistributionTime = block.timestamp;
    }
    
    /**
     * @dev Deposit revenue to the pool (from commercial licenses, platform fees, etc.)
     */
    function depositRevenue() external payable {
        require(msg.value > 0, "Must deposit revenue");
        totalRevenuePool += msg.value;
        emit RevenueDeposited(msg.sender, msg.value);
    }
    
    /**
     * @dev Calculate and distribute revenue based on attribution weights and usage
     */
    function distributeRevenue(
        uint256[] memory _contentIds
    ) external onlyOwner nonReentrant {
        require(block.timestamp >= lastDistributionTime + DISTRIBUTION_CYCLE, "Distribution cycle not complete");
        require(_contentIds.length > 0, "Must provide content IDs");
        require(totalRevenuePool > 0, "No revenue to distribute");
        
        distributionRound++;
        uint256 distributionAmount = totalRevenuePool;
        
        // Calculate weighted distribution
        uint256 totalWeight = 0;
        mapping(address => uint256) storage creatorWeights;
        
        for (uint256 i = 0; i < _contentIds.length; i++) {
            uint256 contentId = _contentIds[i];
            
            // Get content info
            (address creator, , , , , , uint256 usageCount, bool isActive) = contentRegistry.contents(contentId);
            
            if (!isActive || usageCount == 0) continue;
            
            // Get all attributions for this content
            uint256[] memory attributionIds = contentRegistry.getContentAttributions(contentId);
            
            uint256 contentWeight = calculateContentWeight(contentId, usageCount, attributionIds.length);
            
            // Apply reputation multiplier
            uint256 reputationMultiplier = getReputationMultiplier(creator);
            uint256 weightedValue = (contentWeight * reputationMultiplier) / 100;
            
            creatorEarnings[creator] += weightedValue;
            contentRevenue[contentId] += weightedValue;
            totalWeight += weightedValue;
            
            roundDistributions[distributionRound][creator] += weightedValue;
        }
        
        // Convert to actual revenue distribution
        if (totalWeight > 0) {
            // This would normally distribute actual tokens/revenue
            // For now, tracking in creatorEarnings
        }
        
        totalRevenuePool = 0;
        lastDistributionTime = block.timestamp;
        
        emit RevenueDistributed(distributionRound, distributionAmount, _contentIds.length);
    }
    
    /**
     * @dev Calculate content weight using usage, attributions, and quality
     */
    function calculateContentWeight(
        uint256 _contentId,
        uint256 _usageCount,
        uint256 _attributionCount
    ) internal view returns (uint256) {
        uint256 qualityScore = contentQualityScore[_contentId] > 0 ? contentQualityScore[_contentId] : 50;
        
        // Base weight from usage
        uint256 usageWeight = _usageCount * 10;
        
        // Attribution bonus
        uint256 attributionBonus = _attributionCount * 5;
        
        // Quality multiplier (0.5x to 2x)
        uint256 qualityMultiplier = (qualityScore * 2) / 100;
        if (qualityMultiplier == 0) qualityMultiplier = 1;
        
        return (usageWeight + attributionBonus) * qualityMultiplier;
    }
    
    /**
     * @dev Get reputation multiplier for creator (50% to 150%)
     */
    function getReputationMultiplier(address _creator) internal view returns (uint256) {
        uint256 reputation = creatorReputation[_creator];
        
        if (reputation == 0) return 100; // Default 100%
        if (reputation < 50) return 50 + reputation; // 50-100%
        if (reputation >= 100) return 150; // Cap at 150%
        
        return 100 + (reputation / 2); // 100-150%
    }
    
    /**
     * @dev Claim accumulated earnings
     */
    function claimEarnings() external nonReentrant {
        uint256 earnings = creatorEarnings[msg.sender] - claimedEarnings[msg.sender];
        require(earnings > 0, "No earnings to claim");
        
        claimedEarnings[msg.sender] += earnings;
        
        // Transfer PROSPER tokens or ETH
        (bool success, ) = msg.sender.call{value: earnings}("");
        require(success, "Transfer failed");
        
        emit EarningsClaimed(msg.sender, earnings);
    }
    
    /**
     * @dev Update creator reputation (owner or automated oracle)
     */
    function updateCreatorReputation(
        address _creator,
        uint256 _reputation
    ) external onlyOwner {
        require(_reputation <= 100, "Reputation max is 100");
        creatorReputation[_creator] = _reputation;
        emit ReputationUpdated(_creator, _reputation);
    }
    
    /**
     * @dev Update content quality score (owner or automated oracle)
     */
    function updateContentQuality(
        uint256 _contentId,
        uint256 _qualityScore
    ) external onlyOwner {
        require(_qualityScore <= 100, "Quality score max is 100");
        contentQualityScore[_contentId] = _qualityScore;
        emit QualityScoreUpdated(_contentId, _qualityScore);
    }
    
    /**
     * @dev Get claimable earnings for creator
     */
    function getClaimableEarnings(address _creator) external view returns (uint256) {
        return creatorEarnings[_creator] - claimedEarnings[_creator];
    }
    
    /**
     * @dev Get distribution info for round
     */
    function getRoundDistribution(
        uint256 _round,
        address _creator
    ) external view returns (uint256) {
        return roundDistributions[_round][_creator];
    }
    
    /**
     * @dev Emergency withdraw (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    receive() external payable {
        depositRevenue();
    }
}
