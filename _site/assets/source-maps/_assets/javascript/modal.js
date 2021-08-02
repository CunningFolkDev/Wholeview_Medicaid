function hideModal() {
  const overlay = document.getElementById("overlay-1")
  overlay.classList.add("hidden")
}

function activateModal() {
  const overlay = document.getElementById("overlay-1")
  const modalCloseButton = document.getElementById("modal-close")
  const modal = document.getElementById("modal-1")

  if (!modal) return;

  // Close the modal when you click on either the X button or outside the modal
  overlay.addEventListener('click', hideModal)
  modalCloseButton.addEventListener('click', hideModal)

  // Prevent modal from closing when you click on the modal itself
  modal.addEventListener('click', function(event) {
    event.stopPropagation();
  })

  // Allow the ESC key to close the modal
  document.addEventListener('keyup', function (e) {
    e = e || window.event;

    // 27 is the ESC key
    if(e.keyCode === 27) hideModal();
  });

}

ready(activateModal);
