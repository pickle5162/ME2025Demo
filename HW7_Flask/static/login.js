function login() {
    document.getElementById("loginForm").submit();
}
const urlParams = new URLSearchParams(window.location.search);
    const errorType = urlParams.get('error_type');

    if (errorType) {
        if (errorType === 'username') {
            alert('錯誤的帳號');
        } else if (errorType === 'password') {
            alert('錯誤的密碼');
        }
    }

    function login() {
        document.getElementById('loginForm').submit();
    }
