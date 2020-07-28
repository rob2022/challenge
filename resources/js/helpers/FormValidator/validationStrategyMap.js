import RegexParser from "regex-parser";

export default {
    length: (validationRule, value) => {
        const toShort = validationRule.value.min && validationRule.value.min > value.length;
        const toLong = validationRule.value.max && validationRule.value.max < value.length;

        if (toShort || toLong) {
            return {
                valid: false,
                message: validationRule.error_message,
            }
        }

        return {
            valid: true,
            message: '',
        }
    },

    regex: (validationRule, value) => {
        const regExp = new RegExp(RegexParser(validationRule.value));

        if (!regExp.exec(value)) {
            return {
                valid: false,
                message: validationRule.error_message,
            }
        }

        return {
            valid: true,
            message: '',
        }
    }
}
