rpage 
=====

Highly responsive pagination for Bootstrap (http://auxiliary.github.io/rpage/)

### This is a modified version of http://auxiliary.github.io/rpage/ to fit my needs

Usage
=====

Just include `responsive-pagination.js` and call the `rPage` function on the pagination element like this:

```javascript
$(document).ready(function () {
    $(".pagination").rPage();
});
```
    
Default Options
=======================

```javascript
gap: 100, // If we need more space between .pagination and .pagination-wrapper
resize_time: 20 // window resizing time
```