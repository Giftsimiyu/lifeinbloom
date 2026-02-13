# 3D Effects Components Guide

This project includes subtle 3D elements throughout to enhance the design while maintaining the botanical, earthy aesthetic of "Life in Bloom".

## Components Overview

### 1. **Card3d**
3D hover effect for cards - creates a lifting and tilting effect on hover.

```tsx
import Card3d from '@/app/components/card3d';

<Card3d>
  <PostCard {...props} />
</Card3d>
```

**Usage**: Wrap any card component to add hover-triggered 3D transforms.

---

### 2. **RotatingFlower**
Decorative rotating flower SVG with 3D perspective that rotates continuously.

```tsx
import RotatingFlower from '@/app/components/rotatingFlower';

<RotatingFlower 
  position="top-right" 
  size={120} 
  delay={0} 
/>
```

**Props**:
- `position`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
- `size`: Number (default: 120)
- `opacity`: Number (default: 0.1)
- `delay`: Number - animation delay in seconds

---

### 3. **Floating3dLeaf**
Animated floating leaf with 3D rotation effects.

```tsx
import Floating3dLeaf from '@/app/components/floating3dLeaf';

<Floating3dLeaf 
  delay={0} 
  duration={6} 
  scale={1} 
/>
```

**Props**:
- `delay`: Animation start delay
- `duration`: Animation duration in seconds
- `scale`: Size multiplier
- `opacity`: Opacity level

---

### 4. **GlowingAccent**
Subtle glowing orb that pulses - perfect for backgrounds.

```tsx
import GlowingAccent from '@/app/components/glowingAccent';

<GlowingAccent 
  position="bottom-right" 
  size={200} 
  color="terracotta" 
/>
```

**Props**:
- `position`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
- `size`: Number (default: 200)
- `opacity`: Number (default: 0.05)
- `color`: 'olive' | 'terracotta' | 'sage'

---

### 5. **AnimatedBgGradient**
Animated background gradient with floating orbs that pulse.

```tsx
import AnimatedBgGradient from '@/app/components/animatedBgGradient';

<section className="relative">
  <AnimatedBgGradient />
  {/* Your content here */}
</section>
```

---

### 6. **ParallaxDepth**
Adds depth/parallax effect on hover.

```tsx
import ParallaxDepth from '@/app/components/parallaxDepth';

<ParallaxDepth depth={20}>
  <YourComponent />
</ParallaxDepth>
```

**Props**:
- `depth`: How much z-depth to add (default: 20)
- `className`: Additional classes

---

## Usage in Sections

### Hero Section
- RotatingFlower elements in corners
- Floating3dLeaf animations
- Main heading gets the depth treatment

### Post Cards Section
- Cards wrapped with Card3d for hover effects
- Posts lift and tilt on hover

### Call to Action
- GlowingAccent for background visual interest
- Button with smooth 3D transitions

---

## Color Palette (Theme-Aligned)

All 3D elements use the project's established color scheme:
- **Olive**: `var(--color-accent-olive)` - Primary botanical color
- **Sage**: `var(--color-accent-sage)` - Muted green
- **Terracotta**: `var(--color-accent-terracotta)` - Warm earth tone
- **Wilderness**: `var(--color-accent-wilderness)` - Deep brown-orange

---

## Performance Considerations

All 3D effects use:
- **Framer Motion** for smooth animations (GPU-accelerated transforms)
- **CSS `perspective`** for 3D rendering
- **`pointer-events-none`** on decorative elements to avoid blocking interactions
- **Opacity and scale** transforms instead of expensive shadow/blur effects where possible

---

## Adding 3D Effects to New Pages

1. **Import** the components you need:
   ```tsx
   import { Card3d, RotatingFlower, GlowingAccent } from '@/app/components/3dEffects';
   ```

2. **Wrap content** with Card3d for interactive elements
3. **Add background** effects with RotatingFlower or GlowingAccent
4. **Use positioning** to place decorative elements strategically

---

## Best Practices

- ✅ Use subtle opacity levels (0.1 - 0.15) for background elements
- ✅ Add delays to multiple floating elements for variety
- ✅ Keep decorative elements `pointer-events-none` so they don't interfere with clicks
- ✅ Use appropriate sizes relative to viewport (80-200px for background elements)
- ✅ Test on mobile - ensure effects don't impact performance

---

## Future Enhancements

Consider adding:
- Scroll-triggered 3D rotations
- Mouse-following parallax effects
- SVG morphing animations for leaves
- WebGL-based particle effects (if performance permits)
