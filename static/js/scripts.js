

// const content_dir = 'contents/'
// const config_file = 'config.yml'
// const section_names = ['home', 'publications', 'competitions', 'awards', 'patents']


// window.addEventListener('DOMContentLoaded', event => {

//     // Activate Bootstrap scrollspy on the main nav element
//     const mainNav = document.body.querySelector('#mainNav');
//     if (mainNav) {
//         new bootstrap.ScrollSpy(document.body, {
//             target: '#mainNav',
//             offset: 74,
//         });
//     };

//     // Collapse responsive navbar when toggler is visible
//     const navbarToggler = document.body.querySelector('.navbar-toggler');
//     const responsiveNavItems = [].slice.call(
//         document.querySelectorAll('#navbarResponsive .nav-link')
//     );
//     responsiveNavItems.map(function (responsiveNavItem) {
//         responsiveNavItem.addEventListener('click', () => {
//             if (window.getComputedStyle(navbarToggler).display !== 'none') {
//                 navbarToggler.click();
//             }
//         });
//     });


//     // Yaml
//     fetch(content_dir + config_file)
//         .then(response => response.text())
//         .then(text => {
//             const yml = jsyaml.load(text);
//             Object.keys(yml).forEach(key => {
//                 try {
//                     document.getElementById(key).innerHTML = yml[key];
//                 } catch {
//                     console.log("Unknown id and value: " + key + "," + yml[key].toString())
//                 }

//             })
//         })
//         .catch(error => console.log(error));


//     // Marked
//     marked.use({ mangle: false, headerIds: false })
//     section_names.forEach((name, idx) => {
//         fetch(content_dir + name + '.md')
//             .then(response => response.text())
//             .then(markdown => {
//                 const html = marked.parse(markdown);
//                 document.getElementById(name + '-md').innerHTML = html;
//             }).then(() => {
//                 // MathJax
//                 MathJax.typeset();
//             })
//             .catch(error => console.log(error));
//     })

// }); 

// 根据当前页面确定语言配置
function getLanguageConfig() {
    const path = window.location.pathname;
    if (path.includes('index_ch.html')) {
        return {
            config: 'configch.yml',
            suffix: 'ch'
        };
    } else {
        return {
            config: 'config.yml',
            suffix: ''
        };
    }
}

const langConfig = getLanguageConfig();
const content_dir = 'contents/'
const config_file = langConfig.config;
const md_suffix = langConfig.suffix;
const section_names = ['home', 'publications', 'competitions', 'awards', 'patents']

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        // 根据语言后缀构建文件名
        const filename = name + md_suffix + '.md';
        fetch(content_dir + filename)
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    })

});
