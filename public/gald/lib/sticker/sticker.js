  document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const closeButtons = document.querySelectorAll('.close');
    
    // Handle item clicks
    items.forEach(item => {
      item.addEventListener('click', function(e) {
        // Don't activate if clicking on close button
        if (e.target.classList.contains('close')) return;
        
        // If clicked item is already active, do nothing
        if (this.classList.contains('active')) return;
        
        // Remove active class from all items in the same sticker
        const sticker = this.closest('.sticker');
        sticker.querySelectorAll('.item').forEach(i => {
          i.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
      });
    });
    
    // Handle close button clicks
    closeButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.closest('.item').classList.remove('active');
      });
    });
  });