Popper.Defaults.modifiers.computeStyle.gpuAcceleration = !(window.devicePixelRatio < 1.5 && /Win/.test(navigator.platform))

let personAreaButton = document.querySelector('#person-area .share-button');
let personArea = document.querySelector('#person-area');

let personComponents = document.querySelectorAll('.person-component');
let shareComponents = document.querySelectorAll('.share-component');

InitPopover();

window.addEventListener('resize', () => {
  // for desktop or tablet styles
  if(window.innerWidth >= 768) {
    if(!shareComponents[0].classList.contains('d-none')){
      ChangeAreas();
    }

    $('#share-button').popover('enable');
  }

  // for mobile styles
  else{
    $('#share-button').popover('disable');
    $('#share-button').popover('hide');
  }
});

personAreaButton.addEventListener('click', () => {
  // click in mobile styles
  if(window.innerWidth < 768) {
    ChangeAreas();
  }
});

function InitPopover() {
  ($('#share-button').popover({
    container: "body",
    toggle: "popover",
    placement: "top",
    trigger: "click",
    html: true,
    content: "<div class='d-flex flex-row justify-content-between align-items-center'>" +
                shareComponents[0].innerHTML +
                "<div>" +
                  shareComponents[1].innerHTML +
                "</div>"+
              "</div>"
  }));

  if(window.innerWidth >= 768) {
    $('#share-button').popover('enable');
  }

  else{
    $('#share-button').popover('disable');
  }
}

function ChangeAreas(){
  personArea.classList.toggle('bg-dark');
  
  personComponents.forEach(item => {
    item.classList.toggle('d-none');
  });

  shareComponents.forEach(item => {
    item.classList.toggle('d-none');
  });
}