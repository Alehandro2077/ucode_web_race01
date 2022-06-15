// $(".message a").click(function () {
//   $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
// });

document.forms['login_form'].addEventListener('submit', (event) => {
    event.preventDefault();
    
    // TODO do something here to show user that form is being submitted
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) // event.target is the form
    }).then((res) => {
        var pass = document.getElementById('password');
        var login = document.getElementById('login');
        if (res.status == 401) {
            pass.setCustomValidity('Invalid credentials');
            login.setCustomValidity('Invalid credentials');
        }
        else
            window.location.replace(res.url);
    });
});

login = document.getElementById('login');
pass = document.getElementById('password');

const reset_fields = () => {
    login.setCustomValidity('');
    pass.setCustomValidity('');
}

pass.onchange = reset_fields;
login.onchange = reset_fields;
