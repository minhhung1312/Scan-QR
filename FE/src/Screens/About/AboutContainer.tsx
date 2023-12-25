import { About } from "./About"
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const AboutContainer = () => {
    const [userId, setUserId] = useState("9");

    const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
        useLazyGetUserQuery();

    useEffect(() => {
        fetchOne(userId);
    }, [fetchOne, userId]);

    return <About data={data} isLoading={isLoading} />;
};
