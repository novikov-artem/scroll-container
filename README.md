# scroll-container
Scroll container

## Install

```sh
npm install --save scroll-container
```

## Usage

```js
import ScrollContainer from 'scroll-container.js';

customElements.define('scroll-container', ScrollContainer);
```

## Css variables

```css
/* item background && size */
--item-size: 100%;
--item-bg: transparent;

/* space between items */
--items-offset: 1rem;

/* scroll container background */
--scroller-bg: transparent;


/* last item offset */
--fix-offset: --items-offset;
```

## Remove scrollbar & items

Add attribute `scrollbar="off"` for remove scrollbar

Class `.scroll-item` required for each item

## Example

```html

<scroll-container scrollbar="off" class="scroll-container">
    <div class="scroll-item"></div>
    <div class="scroll-item"></div>
</scroll-container>
```
