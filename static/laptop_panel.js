const updateDatabase = (data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/update-database", // adres endpointu Flask
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data), // przekazanie danych jako JSON
      success: resolve, // zwróć odpowiedź po pomyślnej operacji
      error: reject, // obsłuż błąd
    });
  });
};
