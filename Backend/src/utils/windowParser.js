const parseWindow = (value) => {
    const match = String(value).trim().match(/^(\d+)(s|m|h|d)?$/i);
    if (!match) return null;

    const amount = Number(match[1]);
    const unit = (match[2] || "s").toLowerCase();
    const multiplier = { s: 1, m: 60, h: 3600, d: 86400 }[unit];
    const seconds = amount * multiplier;
    return Number.isSafeInteger(seconds) && seconds >= 1 && seconds <= 86400 ? seconds : null;
};

export default parseWindow;
