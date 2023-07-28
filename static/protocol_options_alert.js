function showModalWithOptions(id) {
  const options = {
    title: "Podgld protokołów",
    confirmButtonText: "Pobierz protokół odbiorczy",
    showDenyButton: true,
    denyButtonText: "Pobierz protokół zdawczy",
    focusDeny: true,
  };

  Swal.fire(options).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/protocol/download/${id}/receiving`;
    } else if (result.isDenied) {
      window.location.href = `/protocol/download/${id}/delivery`;
    }
  });
}
