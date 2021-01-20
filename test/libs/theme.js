let switcher = document.querySelector('#switchTheme'),
    label = document.querySelector('label[for="switchTheme"]')

if (switcher) {
    const getTheme = localStorage.getItem('theme') === null || localStorage.getItem('theme') === 'dark'

    if (getTheme) {
        switcher.checked = true
    }

    switchTheme()

    switcher.addEventListener('change', () => {
        switchTheme()
    })
}

function switchTheme() {
    if (switcher.checked) {
        label.textContent = '🌚'
        document.body.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    } else {
        label.textContent = '🌞'
        document.body.setAttribute('data-theme', 'default')
        localStorage.setItem('theme', 'default')
    }
}