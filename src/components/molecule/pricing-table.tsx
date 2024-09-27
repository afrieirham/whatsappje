import Link from "next/link";
import React from "react";

import { Check, MoveRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUserCountry from "@/hooks/use-user-country";

import { Button } from "../ui/button";
import SubscribeButton from "./subscribe-button";

function PricingTable({ showFree }: { showFree?: boolean }) {
  const { country } = useUserCountry();

  return (
    <div className="mt-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 md:flex-row">
        {/* Free Tier */}
        {showFree && (
          <Card className="flex w-full flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>
                For individuals and small business.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4 space-x-2">
                <span className="text-4xl font-bold">
                  {country === "MY" ? "RM0" : "$0"}
                </span>
              </div>
              <ul className="space-y-2">
                <FeatureItem>Links with random alphabet attached</FeatureItem>
                <FeatureItem>2-second delay before redirect</FeatureItem>
                <FeatureItem>QR Code (with our logo)</FeatureItem>
                <FeatureItem>Phone number rotator</FeatureItem>
                <FeatureItem>Unlimited phone numbers</FeatureItem>
                <FeatureItem>Phone number weightage</FeatureItem>
                <FeatureItem>Link clicks count</FeatureItem>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full space-x-2" asChild>
                <Link href="/dashboard/links">
                  <span>Get Started</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Pro Tier */}
        <Card className="flex w-full max-w-none flex-col border-4 border-zinc-900 shadow-2xl sm:max-w-[50%]">
          <CardHeader>
            <CardTitle className="text-2xl">Pro</CardTitle>
            <CardDescription>
              For business with more advance requirement.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4 space-x-2">
              <span className="text-4xl font-bold">
                {country === "MY" ? "RM90" : "$90"}
              </span>
              <span className="text-sm text-muted-foreground">
                per year, cancel anytime.
              </span>
            </div>
            <ul className="space-y-2">
              <FeatureItem>Premium Links (customizable slug)</FeatureItem>
              <FeatureItem>Instant redirect</FeatureItem>
              <FeatureItem>QR Code (custom logo and color)</FeatureItem>
              <FeatureItem>Phone number rotator</FeatureItem>
              <FeatureItem>Unlimited phone numbers</FeatureItem>
              <FeatureItem>Phone number weightage</FeatureItem>
              <FeatureItem>Link clicks count</FeatureItem>
            </ul>
          </CardContent>
          <CardFooter>
            <SubscribeButton
              billing="annually"
              className="flex w-full space-x-2"
            >
              <span>Choose Pro</span>
              <MoveRight className="h-4 w-4" />
            </SubscribeButton>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default PricingTable;

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center space-x-2">
      <Check className="h-5 w-5 text-black" />
      <span>{children}</span>
    </li>
  );
}
