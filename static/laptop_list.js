function handleSelectChange() {
    const selectedValue = document.getElementById('mySelect').value;
    console.log('Wybrano opcję:', selectedValue);
}
document.getElementById('mySelect').addEventListener('change', handleSelectChange);
