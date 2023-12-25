import { Result } from "./Result"
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const ResultContainer = () => {
    const [userId, setUserId] = useState("9");

    const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
        useLazyGetUserQuery();

    useEffect(() => {
        fetchOne(userId);
    }, [fetchOne, userId]);

    return <Result data={data} isLoading={isLoading} />;
};
