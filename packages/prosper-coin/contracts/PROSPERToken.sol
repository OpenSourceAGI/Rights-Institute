// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title PROSPERToken
 * @dev ERC20 token for the PROSPER Credit System
 * Distributed to creators based on usage metrics and attribution
 */
contract PROSPERToken is ERC20, Ownable, Pausable {
    // Maximum supply: 1 billion tokens
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;
    
    // Minting allocation percentages
    uint256 public constant CREATOR_POOL_PERCENT = 70;
    uint256 public constant COMMUNITY_POOL_PERCENT = 20;
    uint256 public constant TEAM_POOL_PERCENT = 10;
    
    // Pool addresses
    address public creatorPool;
    address public communityPool;
    address public teamPool;
    
    // Authorized minters (RevenueSharing contract)
    mapping(address => bool) public authorizedMinters;
    
    // Events
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    event PoolAddressUpdated(string poolName, address newAddress);
    
    constructor(
        address _creatorPool,
        address _communityPool,
        address _teamPool
    ) ERC20("PROSPER", "PRSP") Ownable(msg.sender) {
        require(_creatorPool != address(0), "Invalid creator pool address");
        require(_communityPool != address(0), "Invalid community pool address");
        require(_teamPool != address(0), "Invalid team pool address");
        
        creatorPool = _creatorPool;
        communityPool = _communityPool;
        teamPool = _teamPool;
        
        // Initial distribution
        uint256 creatorAmount = (MAX_SUPPLY * CREATOR_POOL_PERCENT) / 100;
        uint256 communityAmount = (MAX_SUPPLY * COMMUNITY_POOL_PERCENT) / 100;
        uint256 teamAmount = (MAX_SUPPLY * TEAM_POOL_PERCENT) / 100;
        
        _mint(creatorPool, creatorAmount);
        _mint(communityPool, communityAmount);
        _mint(teamPool, teamAmount);
    }
    
    /**
     * @dev Add authorized minter (typically RevenueSharing contract)
     */
    function addMinter(address minter) external onlyOwner {
        require(minter != address(0), "Invalid minter address");
        authorizedMinters[minter] = true;
        emit MinterAdded(minter);
    }
    
    /**
     * @dev Remove authorized minter
     */
    function removeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
        emit MinterRemoved(minter);
    }
    
    /**
     * @dev Mint tokens to creator from pool
     * Can only be called by authorized minters
     */
    function mintToCreator(address creator, uint256 amount) external whenNotPaused {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        require(creator != address(0), "Invalid creator address");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        
        _mint(creator, amount);
    }
    
    /**
     * @dev Update pool addresses
     */
    function updateCreatorPool(address _newPool) external onlyOwner {
        require(_newPool != address(0), "Invalid address");
        creatorPool = _newPool;
        emit PoolAddressUpdated("creator", _newPool);
    }
    
    function updateCommunityPool(address _newPool) external onlyOwner {
        require(_newPool != address(0), "Invalid address");
        communityPool = _newPool;
        emit PoolAddressUpdated("community", _newPool);
    }
    
    function updateTeamPool(address _newPool) external onlyOwner {
        require(_newPool != address(0), "Invalid address");
        teamPool = _newPool;
        emit PoolAddressUpdated("team", _newPool);
    }
    
    /**
     * @dev Pause token transfers in emergency
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Override transfer to include pause check
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override whenNotPaused {
        super._update(from, to, value);
    }
}
