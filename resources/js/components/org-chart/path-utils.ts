import { type Point } from './types';

export const getAnchorPoint = (
    rect: DOMRect,
    side: 'top' | 'bottom' | 'left' | 'right',
    containerRect: DOMRect,
): Point => {
    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;

    switch (side) {
        case 'top':
            return { x: x + rect.width / 2, y };
        case 'bottom':
            return { x: x + rect.width / 2, y: y + rect.height };
        case 'left':
            return { x, y: y + rect.height / 2 };
        case 'right':
            return { x: x + rect.width, y: y + rect.height / 2 };
    }
};

export const verticalPath = (from: Point, to: Point): string => {
    const midY = (from.y + to.y) / 2;
    return `M ${from.x},${from.y} C ${from.x},${midY} ${to.x},${midY} ${to.x},${to.y}`;
};

export const straightVerticalPath = (from: Point, to: Point): string => {
    return `M ${from.x},${from.y} L ${to.x},${to.y}`;
};

export const horizontalPath = (from: Point, to: Point): string => {
    return `M ${from.x},${from.y} L ${to.x},${to.y}`;
};

export const elbowPath = (from: Point, to: Point, direction: 'vertical-first' | 'horizontal-first'): string => {
    if (direction === 'vertical-first') {
        return `M ${from.x},${from.y} L ${from.x},${to.y} L ${to.x},${to.y}`;
    }
    return `M ${from.x},${from.y} L ${to.x},${from.y} L ${to.x},${to.y}`;
};
