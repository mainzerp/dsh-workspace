function valid(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const body = value;
    return typeof body.is_available === 'boolean' && Array.isArray(body.balance_infos) && body.balance_infos.every(item => {
        if (typeof item !== 'object' || item === null)
            return false;
        const info = item;
        return typeof info.currency === 'string' && typeof info.total_balance === 'string' && typeof info.granted_balance === 'string' && typeof info.topped_up_balance === 'string';
    });
}
/** @param apiKey DeepSeek token. @param baseUrl API root. @param signal cancellation. @returns normalized balance. */
export async function fetchBalance(apiKey, baseUrl, signal) {
    if (!apiKey)
        return { available: null, balances: [], error: 'DEEPSEEK_API_KEY is not configured' };
    try {
        const response = await fetch(new URL('/user/balance', baseUrl), { headers: { Accept: 'application/json', Authorization: `Bearer ${apiKey}` }, ...(signal === undefined ? {} : { signal }) });
        if (!response.ok)
            throw new Error(`DeepSeek balance endpoint returned HTTP ${response.status}`);
        const body = await response.json();
        if (!valid(body))
            throw new Error('DeepSeek balance endpoint returned unexpected data');
        return { available: body.is_available, balances: body.balance_infos.map(info => ({ currency: info.currency, totalBalance: info.total_balance, grantedBalance: info.granted_balance, toppedUpBalance: info.topped_up_balance })) };
    }
    catch (error) {
        return { available: null, balances: [], error: error instanceof Error ? error.message : String(error) };
    }
}
//# sourceMappingURL=balance.js.map