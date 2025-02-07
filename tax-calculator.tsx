"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function TaxCalculator() {
  const [income, setIncome] = useState("")
  const [regime, setRegime] = useState("new")
  const [result, setResult] = useState<{ tax: number; effectiveRate: number } | null>(null)

  const calculateTax = () => {
    const annualIncome = Number.parseFloat(income)
    let tax = 0

    if (regime === "new") {
      if (annualIncome <= 300000) {
        tax = 0
      } else if (annualIncome <= 600000) {
        tax = (annualIncome - 300000) * 0.05
      } else if (annualIncome <= 900000) {
        tax = 15000 + (annualIncome - 600000) * 0.1
      } else if (annualIncome <= 1200000) {
        tax = 45000 + (annualIncome - 900000) * 0.15
      } else if (annualIncome <= 1500000) {
        tax = 90000 + (annualIncome - 1200000) * 0.2
      } else {
        tax = 150000 + (annualIncome - 1500000) * 0.3
      }
    } else {
      // Old regime calculation (simplified for this example)
      if (annualIncome <= 250000) {
        tax = 0
      } else if (annualIncome <= 500000) {
        tax = (annualIncome - 250000) * 0.05
      } else if (annualIncome <= 1000000) {
        tax = 12500 + (annualIncome - 500000) * 0.2
      } else {
        tax = 112500 + (annualIncome - 1000000) * 0.3
      }
    }

    const effectiveRate = (tax / annualIncome) * 100
    setResult({ tax, effectiveRate })
  }

  return (
    <div className="min-h-screen bg-black bg-[length:400%_400%] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-md border-2 border-white border-opacity-20 shadow-lg rounded-xl overflow-hidden animate-float">
        <CardHeader className="space-y-1 bg-gradient-to-r from-pastel-pink to-pastel-purple p-6">
          <CardTitle className="text-3xl font-bold text-center text-white drop-shadow-md">
            Indian Income Tax Calculator
          </CardTitle>
          <CardDescription className="text-pastel-yellow text-center font-medium">
            Calculate your income tax based on the new or old tax regime
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="income" className="text-pastel-blue font-semibold">
              Annual Income (₹)
            </Label>
            <Input
              id="income"
              placeholder="Enter your annual income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              type="number"
              className="bg-white bg-opacity-20 border-2 border-pastel-purple text-white placeholder-pastel-purple placeholder-opacity-70 focus:border-vibrant-yellow focus:ring-vibrant-yellow transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="regime" className="text-pastel-green font-semibold">
              Tax Regime
            </Label>
            <Select value={regime} onValueChange={setRegime}>
              <SelectTrigger id="regime" className="bg-white bg-opacity-20 border-2 border-pastel-green text-white">
                <SelectValue placeholder="Select tax regime" />
              </SelectTrigger>
              <SelectContent className="bg-vibrant-purple bg-opacity-90 border-2 border-pastel-green">
                <SelectItem
                  value="new"
                  className="text-white hover:bg-vibrant-pink hover:bg-opacity-50 transition-colors duration-200"
                >
                  New Regime
                </SelectItem>
                <SelectItem
                  value="old"
                  className="text-white hover:bg-vibrant-pink hover:bg-opacity-50 transition-colors duration-200"
                >
                  Old Regime
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={calculateTax}
            className="w-full bg-gradient-to-r from-vibrant-green to-vibrant-blue text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:from-vibrant-yellow hover:to-vibrant-orange hover:scale-105 focus:outline-none focus:ring-2 focus:ring-vibrant-purple focus:ring-opacity-50 shadow-lg"
          >
            Calculate Tax
          </Button>
          {result && (
            <Alert className="bg-gradient-to-r from-pastel-blue to-pastel-green border-2 border-white border-opacity-20 rounded-lg animate-fade-in">
              <InfoIcon className="h-5 w-5 text-vibrant-purple" />
              <AlertTitle className="text-vibrant-purple font-bold">Tax Calculation Result</AlertTitle>
              <AlertDescription className="mt-2">
                <p className="text-vibrant-blue font-semibold">Total Tax: ₹{result.tax.toFixed(2)}</p>
                <p className="text-vibrant-pink font-semibold">
                  Effective Tax Rate: {result.effectiveRate.toFixed(2)}%
                </p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

