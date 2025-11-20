
# Pre-Fabric-Style · Pendências de Utilitários

Lista rápida de blocos que pretendo imitar do Tailwind. Cada item tem só **um** exemplo para eu clonar depois.

## Layout & Flex/Grid
- Flex helpers (`flex-row`, `flex-col`, `flex-wrap`, `items-stretch`, `self-*`, `justify-self`, `place-items`, `gap-x/y`, `order`, `grow`, `shrink`, `basis`), grids (`grid-cols-*`, `grid-rows-*`, `auto-rows`, `col-span/row-span`), versões responsivas.
```
.flex-row { display: flex; flex-direction: row; }
```

## Dimensionamento & Espaçamento
- `min/max-w`, `min/max-h`, frações (`w-1/2`, `w-1/3`), `aspect-ratio`, `object-fit/position`, `inset-*`, `space-x/y-*`, `scroll-snap`, `overscroll`, `contain`, helpers com `clamp()` e unidades `vw/vh`.
```
.aspect-video { aspect-ratio: 16 / 9; }
```

## Posicionamento & Transformações
- Complementar `position/z/top/right/bottom/left`, adicionar `translate/scale/rotate/skew`, `transform-origin`, `will-change`, `sticky`, `isolation`.
```
.translate-x-1 { transform: translateX(0.25rem); }
```

## Tipografia & Conteúdo
- `leading-*`, `font-family` presets, `whitespace-*`, `text-wrap/balance`, `hyphens`, `list-style-*`, `indent` extras, `underline-offset`, `text-decoration-*`.
```
.leading-tight { line-height: 1.25; }
```

## Cores, Fundos & Efeitos
- `opacity-0…100`, `bg-gradient-*`, `bg-cover/contain`, `bg-center/top/bottom`, `bg-repeat`, `mix-blend-mode`, mais níveis de `box-shadow`, `drop-shadow`, `filter`/`backdrop-filter`, `outline-*` alinhado à paleta.
```
.opacity-80 { opacity: 0.8; }
```

## Bordas, Outline & Divisores
- `border-t/b/l/r`, `border-x/y`, `border-spacing`, `divide-x/y`, `ring`/`ring-offset`, `outline-width/style/cor`, variações por eixo.
```
.border-b { border-bottom-width: 1px; border-bottom-style: solid; }
```

## Interações & Motion
- `pointer-events-*`, `appearance-none`, `accent-color`, `caret-color`, steps extras de `transition-duration/easing`, `animation-*`, `scroll-behavior`, `touch-action`, mais cursores, `visually-hidden`.
```
.transition-150 { transition: all 150ms ease-in-out; }
```

