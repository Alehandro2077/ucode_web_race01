setInterval(() => {
    fetch(document.URL).then((res) => {
        if (res.redirected) {
            window.location.replace(res.url);
        }
    })
}, 1000);
