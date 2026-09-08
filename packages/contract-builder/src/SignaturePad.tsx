"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@rights/ui/button';
import { Label } from '@rights/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@rights/ui/card';
import { RotateCcw, Trash2, Download } from 'lucide-react';

interface SignaturePadComponentProps {
  onSignatureChange: (signatureData: string | null) => void;
  label?: string;
  required?: boolean;
}

interface Point {
  x: number;
  y: number;
}

const SignaturePadComponent: React.FC<SignaturePadComponentProps> = ({
  onSignatureChange,
  label = "Signature",
  required = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [paths, setPaths] = useState<Point[][]>([]);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    return { canvas, ctx };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.strokeStyle = 'rgb(59, 130, 246)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const redrawCanvas = useCallback(() => {
    const { canvas, ctx } = getCanvasContext() || {};
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    [...paths, currentPath].forEach(path => {
      if (path.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      
      ctx.stroke();
    });
  }, [paths, currentPath, getCanvasContext]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getMousePos(e);
    setCurrentPath([pos]);
  }, [getMousePos]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    setCurrentPath(prev => [...prev, pos]);
  }, [isDrawing, getMousePos]);

  const stopDrawing = useCallback(() => {
    if (isDrawing && currentPath.length > 0) {
      setPaths(prev => [...prev, currentPath]);
      setCurrentPath([]);
      setIsDrawing(false);
      
      const hasContent = paths.length > 0 || currentPath.length > 1;
      setIsEmpty(!hasContent);
      
      if (hasContent) {
        // Convert canvas to data URL
        const canvas = canvasRef.current;
        if (canvas) {
          const dataURL = canvas.toDataURL('image/png');
          onSignatureChange(dataURL);
        }
      } else {
        onSignatureChange(null);
      }
    }
  }, [isDrawing, currentPath, paths, onSignatureChange]);

  const clearSignature = useCallback(() => {
    setPaths([]);
    setCurrentPath([]);
    setIsEmpty(true);
    onSignatureChange(null);
    
    const { ctx } = getCanvasContext() || {};
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }, [getCanvasContext, onSignatureChange]);

  const undoSignature = useCallback(() => {
    if (paths.length > 0) {
      const newPaths = paths.slice(0, -1);
      setPaths(newPaths);
      const hasContent = newPaths.length > 0;
      setIsEmpty(!hasContent);
      
      if (hasContent) {
        const canvas = canvasRef.current;
        if (canvas) {
          const dataURL = canvas.toDataURL('image/png');
          onSignatureChange(dataURL);
        }
      } else {
        onSignatureChange(null);
      }
    }
  }, [paths, onSignatureChange]);

  const downloadSignature = useCallback(() => {
    if (!isEmpty) {
      const canvas = canvasRef.current;
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'signature.png';
        link.href = dataURL;
        link.click();
      }
    }
  }, [isEmpty]);

  return (
    <Card className="bg-slate-900 border border-slate-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-100 text-lg">
          {label} {required && <span className="text-red-400">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-slate-700 rounded-lg overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            className="w-full h-48 cursor-crosshair"
            style={{ touchAction: 'none' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={clearSignature}
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          
          <Button
            type="button"
            onClick={undoSignature}
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Undo
          </Button>
          
          <Button
            type="button"
            onClick={downloadSignature}
            variant="outline"
            size="sm"
            disabled={isEmpty}
            className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
        
        {isEmpty && required && (
          <p className="text-sm text-red-400">
            Signature is required
          </p>
        )}
        
        {!isEmpty && (
          <p className="text-sm text-green-400">
            ✓ Signature captured
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SignaturePadComponent; 