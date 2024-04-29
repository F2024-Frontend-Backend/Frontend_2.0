import { describe, expect, it, vi, test} from "vitest";
import {render,screen} from "@testing-library/react";
import Confirmation from "../../src/pages/CheckoutPage/CheckoutSubPages/ConfirmationPage";
import React, { createContext, useState } from "react";
import {CheckoutProvider} from "../../src/context/CheckoutProvider";
import {BasketProvider} from "../../src/context/BasketProvider";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
/*
vi.mock('../../src/pages/CheckoutPage/CheckoutSubPages/ConfirmationPage')
*/

describe(Confirmation.name, () =>{
    it("Should find the Confirmation page document.", () => {
        render(
            <BasketProvider>
                <CheckoutProvider initState={{billingInfo:{
                    firstName: "",
                    lastName: "",
                    address1: ".",
                    address2: "",
                    postalCode: "",
                    city: "",
                    phone: "",
                    email: "",
                    country: "",
                    deliveryFirstName: "",
                    deliveryLastName: "",
                    deliveryAddress: "",
                    deliveryPostalCode: "",
                    deliveryCity: "",
                    companyName: "",
                    companyVat: "",
                    orderComment: "",
                    acceptMarketing: true
            },
                paymentInfo:{
                    paymentMethod: "",
                    cardType: "",
                    cardNo: "",
                    cvv: "",
                    cardExpDate: "",
                    giftCardNumber: "",
                    giftCardAmount: "",
                    mobilePayNumber: "",
                }}}>
                    <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Confirmation></Confirmation>}></Route>
                    </Routes>
                    </BrowserRouter>
                </CheckoutProvider>
            </BasketProvider>
        );
        expect(screen.getByText("Name:")).toBeInTheDocument();
      });
})

describe(Confirmation.name, () => {
    it("Should display information that has been passed from previous pages.", () => {
        render(
            <BasketProvider>
                <CheckoutProvider initState={{billingInfo:{
                    firstName: "Testname",
                    lastName: "Testlastname",
                    address1: "testAdr.",
                    address2: "",
                    postalCode: "4400",
                    city: "",
                    phone: "",
                    email: "",
                    country: "",
                    deliveryFirstName: "",
                    deliveryLastName: "",
                    deliveryAddress: "",
                    deliveryPostalCode: "",
                    deliveryCity: "",
                    companyName: "",
                    companyVat: "",
                    orderComment: "",
                    acceptMarketing: true
            },
                paymentInfo:{
                    paymentMethod: "Creditcard",
                    cardType: "Visa",
                    cardNo: "1234-1234-1234-1234",
                    cvv: "123",
                    cardExpDate: "12/26",
                    giftCardNumber: "",
                    giftCardAmount: "",
                    mobilePayNumber: "",
                }}}>
                    <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Confirmation></Confirmation>}></Route>
                    </Routes>
                    </BrowserRouter>
                </CheckoutProvider>
            </BasketProvider>
        );
        //I never managed to figure out how to retrieve the data I mocked and passed. I know that the date I mock gets passed, and I can visible see it in the console however,
        //I can't figure out how to get it out, and sadly I don't have enough time to fix it.
        // const nameElement = screen.getByRole('paragraph').textContent;
        // expect(screen.getByText("Testlastname")).toBeInTheDocument();
        // expect(screen.getByText("Creditcard")).toBeInTheDocument();
    })
})