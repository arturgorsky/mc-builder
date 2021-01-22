import reducer from "./auth";
import * as actionTypes from "../acitons/actionTypes";

describe("Auth reducer", () => {
    it("Should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
        });
    });

    it("Should store the token upon login", () => {
        expect(
            reducer(
                {
                    token: null,
                    userId: null,
                    error: null,
                    loading: false,
                    authRedirectPath: "/",
                },
                {
                    type: actionTypes.AUTH_SUCCESS,
                    idToken: "the-token",
                    userId: "the-user-id",
                }
            )
        ).toEqual({
            token: "the-token",
            userId: "the-user-id",
            error: null,
            loading: false,
            authRedirectPath: "/",
        });
    });
});
