package utils

import (
	"math"
)

func RoundToDecimals(value float32, decimals int) float32 {
	factor := math.Pow10(decimals)
	return float32(math.Round(float64(value)*factor) / factor)
}
