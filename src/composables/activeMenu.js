export const useActiveMenu = (event, activeClassName) => {
    let target = event.target;
    if(target.classList.contains(activeClassName)) return;
    
    let menuElements = event.target.parentElement.children;
    for (const el of menuElements) {
      if(el.classList.contains(activeClassName)) {
        el.classList.remove(activeClassName);
        break;
      }
    }

    target.classList.add(activeClassName);
    return;
  }