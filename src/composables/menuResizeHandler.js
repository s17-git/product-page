export function useResizeHandler( obj = {} ) {

  if( window.innerWidth >= obj.desktopBreakPoint ) obj.showMenu.value = true;
  
  window.addEventListener('resize', () => {
    if( window.innerWidth >= obj.desktopBreakPoint ) 
    obj.showMenu.value = true;
    else {
      obj.showMenu.value = false;
      obj.displayOverlay.value = false;
      obj.showThumbnailLightbox.value = false;
    }
  });
}