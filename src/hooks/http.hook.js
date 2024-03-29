import { useState, useCallback } from "react";
import axios from "axios";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

        setProcess('loading');

        try {
            const response = await axios({ 
                method: method, 
                url: url,
                body: body, 
                headers: headers 
            });

            if (response.status !== 200) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = response.data;

            return data;
        } catch (e) {
            setProcess('error');
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading');
    }, []);

    return { request, clearError, process, setProcess }
}