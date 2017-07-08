rpage 
=====

Highly responsive pagination for Bootstrap (http://auxiliary.github.io/rpage/)

### This is a modified version of http://auxiliary.github.io/rpage/ to fit my needs

### Can be used with CSS3 Flexible Box or with old good float: left/float: right.

Usage
=====
1. Include css styles from index.html and modify for your needs.
2. Include `responsive-pagination.js` and call the `rPage` function on the pagination element like this:

```javascript
$('.pagination').rPage({
    gap: 0, // Gap between previous and next button and pagination class
    resize_time: 20 // How often in milliseconds to refresh plugin on resize
});
```