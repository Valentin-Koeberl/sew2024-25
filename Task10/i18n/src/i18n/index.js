import {createI18n} from 'vue-i18n'

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            "currentTime": "Current Time",
            "sampleNumber": "Sample Number",
            "currency": "Currency"
        },
        de: {
            "currentTime": "Aktuelle Zeit",
            "sampleNumber": "Beispielzahl",
            "currency": "Währung"
        }
    },
    numberFormats: {
        en: {
            currency: {
                style: 'currency',
                currency: 'USD'
            },
            decimal: {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        },
        de: {
            currency: {
                style: 'currency',
                currency: 'EUR'
            },
            decimal: {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        }
    },
    datetimeFormats: {
        en: {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric'
            }
        },
        de: {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric'
            }
        }
    }
})

export default i18n 