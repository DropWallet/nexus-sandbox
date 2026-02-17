#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Primitives - base Tailwind color values
const primitives = {
  Zinc: {
    50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8",
    400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3e3e47",
    800: "#29292e", 900: "#1d1d21", 950: "#0f0f10"
  },
  Orange: {
    50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74",
    400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c",
    800: "#9a3412", 900: "#7c2d12", 950: "#431407"
  },
  Blue: {
    50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
    400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8",
    800: "#1e40af", 900: "#1e3a8a", 950: "#172554"
  },
  Green: {
    50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac",
    400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d",
    800: "#166534", 900: "#14532d", 950: "#052e16"
  },
  Yellow: {
    50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047",
    400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207",
    800: "#854d0e", 900: "#713f12", 950: "#422006"
  },
  Red: {
    50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5",
    400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c",
    800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a"
  },
  Violet: {
    50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd",
    400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9",
    800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065"
  },
  Teal: {
    50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4",
    400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e",
    800: "#115e59", 900: "#134e4a", 950: "#042f2e"
  },
  Alpha: {
    White: {
      50: "rgba(255, 255, 255, 0.0500)", 100: "rgba(255, 255, 255, 0.1000)",
      200: "rgba(255, 255, 255, 0.2000)", 300: "rgba(255, 255, 255, 0.3000)",
      400: "rgba(255, 255, 255, 0.4000)", 500: "rgba(255, 255, 255, 0.5000)",
      600: "rgba(255, 255, 255, 0.6000)", 700: "rgba(255, 255, 255, 0.7000)",
      800: "rgba(255, 255, 255, 0.8000)", 900: "rgba(255, 255, 255, 0.9000)",
      950: "rgba(255, 255, 255, 0.9500)"
    },
    Black: {
      50: "rgba(0, 0, 0, 0.0500)", 100: "rgba(0, 0, 0, 0.1000)",
      200: "rgba(0, 0, 0, 0.2000)", 300: "rgba(0, 0, 0, 0.3000)",
      400: "rgba(0, 0, 0, 0.4000)", 500: "rgba(0, 0, 0, 0.5000)",
      600: "rgba(0, 0, 0, 0.6000)", 700: "rgba(0, 0, 0, 0.7000)",
      800: "rgba(0, 0, 0, 0.8000)", 900: "rgba(0, 0, 0, 0.9000)",
      950: "rgba(0, 0, 0, 0.9500)"
    }
  }
}

// Brand mappings (from Brand - Colours.Mode 1)
const brand = {
  Neutral: primitives.Zinc,
  Primary: primitives.Orange,
  Info: primitives.Blue,
  Success: primitives.Green,
  Warning: primitives.Yellow,
  Danger: primitives.Red,
  Premium: primitives.Violet,
  Creators: primitives.Teal,
  Translucent: {
    Light: primitives.Alpha.White,
    Dark: primitives.Alpha.Black
  }
}

// Resolve reference like {Neutral.950} or {Translucent.Light.100}
function resolveReference(ref, context = {}) {
  if (typeof ref !== 'string' || !ref.startsWith('{') || !ref.endsWith('}')) {
    return ref
  }
  
  const path = ref.slice(1, -1).split('.')
  let value = { ...brand, ...context }
  
  for (const key of path) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      console.warn(`Reference not found: ${ref}`)
      return ref
    }
  }
  
  // If it's still a reference, resolve recursively
  if (typeof value === 'string' && value.startsWith('{')) {
    return resolveReference(value, context)
  }
  
  return value
}

// Process semantic tokens from theme files
function processSemanticTokens(themeData) {
  const semantic = {}
  
  function processObject(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && '$value' in value) {
        const resolved = resolveReference(value.$value)
        const path = prefix ? `${prefix}.${key}` : key
        setNestedValue(semantic, path, resolved)
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        processObject(value, prefix ? `${prefix}.${key}` : key)
      }
    }
  }
  
  processObject(themeData)
  return semantic
}

function setNestedValue(obj, path, value) {
  const keys = path.split('.')
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {}
    current = current[keys[i]]
  }
  current[keys[keys.length - 1]] = value
}

// Dark theme semantic tokens (from Elements - Colours.Dark theme)
const darkTheme = {
  Surface: {
    Base: { "$value": "{Neutral.950}" },
    Low: { "$value": "{Neutral.900}" },
    Mid: { "$value": "{Neutral.800}" },
    High: { "$value": "{Neutral.700}" },
    Translucent: {
      Low: { "$value": "{Translucent.Light.50}" },
      Mid: { "$value": "{Translucent.Light.100}" },
      High: { "$value": "{Translucent.Light.200}" }
    }
  },
  Neutral: {
    Weak: { "$value": "{Neutral.500}" },
    Subdued: { "$value": "{Neutral.400}" },
    Moderate: { "$value": "{Neutral.300}" },
    Strong: { "$value": "{Neutral.100}" },
    Translucent: {
      Weaker: { "$value": "{Translucent.Light.100}" },
      Weak: { "$value": "{Translucent.Light.400}" },
      Subdued: { "$value": "{Translucent.Light.500}" },
      Moderate: { "$value": "{Translucent.Light.700}" },
      Strong: { "$value": "{Translucent.Light.950}" }
    }
  },
  Primary: {
    Weak: { "$value": "{Primary.700}" },
    Subdued: { "$value": "{Primary.500}" },
    Moderate: { "$value": "{Primary.400}" },
    Strong: { "$value": "{Primary.300}" }
  },
  Info: {
    Weak: { "$value": "{Info.700}" },
    Subdued: { "$value": "{Info.500}" },
    Moderate: { "$value": "{Info.400}" },
    Strong: { "$value": "{Info.300}" }
  },
  Success: {
    Weak: { "$value": "{Success.800}" },
    Subdued: { "$value": "{Success.600}" },
    Moderate: { "$value": "{Success.500}" },
    Strong: { "$value": "{Success.300}" }
  },
  Warning: {
    Weak: { "$value": "{Warning.600}" },
    Subdued: { "$value": "{Warning.400}" },
    Moderate: { "$value": "{Warning.300}" },
    Strong: { "$value": "{Warning.200}" }
  },
  Danger: {
    Weak: { "$value": "{Danger.800}" },
    Subdued: { "$value": "{Danger.600}" },
    Moderate: { "$value": "{Danger.500}" },
    Strong: { "$value": "{Danger.400}" }
  },
  Stroke: {
    Neutral: {
      Translucent: {
        Weak: { "$value": "{Translucent.Light.100}" },
        Subdued: { "$value": "{Translucent.Light.200}" },
        Moderate: { "$value": "{Translucent.Light.300}" },
        Strong: { "$value": "{Translucent.Light.600}" }
      }
    }
  }
}

// Light theme semantic tokens
const lightTheme = {
  Surface: {
    Base: { "$value": "{Neutral.300}" },
    Low: { "$value": "{Neutral.200}" },
    Mid: { "$value": "{Neutral.100}" },
    High: { "$value": "{Neutral.50}" },
    Translucent: {
      Low: { "$value": "{Translucent.Light.50}" },
      Mid: { "$value": "{Translucent.Light.100}" },
      High: { "$value": "{Translucent.Light.200}" }
    }
  },
  Neutral: {
    Weak: { "$value": "{Neutral.500}" },
    Subdued: { "$value": "{Neutral.600}" },
    Moderate: { "$value": "{Neutral.700}" },
    Strong: { "$value": "{Neutral.900}" },
    Translucent: {
      Weaker: { "$value": "{Translucent.Dark.100}" },
      Weak: { "$value": "{Translucent.Dark.500}" },
      Subdued: { "$value": "{Translucent.Dark.700}" },
      Moderate: { "$value": "{Translucent.Dark.800}" },
      Strong: { "$value": "{Translucent.Dark.950}" }
    }
  },
  Primary: {
    Weak: { "$value": "{Primary.700}" },
    Subdued: { "$value": "{Primary.500}" },
    Moderate: { "$value": "{Primary.400}" },
    Strong: { "$value": "{Primary.300}" }
  },
  Info: {
    Weak: { "$value": "{Info.300}" },
    Subdued: { "$value": "{Info.400}" },
    Moderate: { "$value": "{Info.500}" },
    Strong: { "$value": "{Info.700}" }
  },
  Success: {
    Weak: { "$value": "{Success.300}" },
    Subdued: { "$value": "{Success.500}" },
    Moderate: { "$value": "{Success.700}" },
    Strong: { "$value": "{Success.800}" }
  },
  Warning: {
    Weak: { "$value": "{Warning.500}" },
    Subdued: { "$value": "{Warning.600}" },
    Moderate: { "$value": "{Warning.800}" },
    Strong: { "$value": "{Warning.950}" }
  },
  Danger: {
    Weak: { "$value": "{Danger.400}" },
    Subdued: { "$value": "{Danger.500}" },
    Moderate: { "$value": "{Danger.600}" },
    Strong: { "$value": "{Danger.800}" }
  },
  Stroke: {
    Neutral: {
      Translucent: {
        Weak: { "$value": "{Translucent.Dark.200}" },
        Subdued: { "$value": "{Translucent.Dark.200}" },
        Moderate: { "$value": "{Translucent.Dark.300}" },
        Strong: { "$value": "#ffffff" }
      }
    }
  }
}

// Process semantic tokens
const darkSemantic = processSemanticTokens(darkTheme)
const lightSemantic = processSemanticTokens(lightTheme)

// Spacing from Numbers
const spacing = {
  "0": "0px",
  "0.5": "2px",
  "1": "4px",
  "1.5": "6px",
  "2": "8px",
  "2.5": "10px",
  "3": "12px",
  "3.5": "14px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "7": "28px",
  "8": "32px",
  "9": "36px",
  "10": "40px",
  "11": "44px",
  "12": "48px",
  "14": "56px",
  "16": "64px",
  "20": "80px",
  "24": "96px",
  "28": "112px",
  "32": "128px",
  "36": "144px",
  "40": "160px",
  "44": "176px",
  "48": "192px",
  "52": "208px",
  "56": "224px",
  "60": "240px",
  "64": "256px",
  "72": "288px",
  "80": "320px",
  "96": "384px"
}

// Border radius
const borderRadius = {
  "none": "0px",
  "sm": "2px",
  "base": "4px",
  "md": "6px",
  "lg": "8px",
  "xl": "12px",
  "2xl": "16px",
  "3xl": "24px",
  "full": "9999px"
}

// Create final tokens structure
const tokens = {
  colors: {
    base: {
      zinc: primitives.Zinc,
      orange: primitives.Orange,
      blue: primitives.Blue,
      green: primitives.Green,
      yellow: primitives.Yellow,
      red: primitives.Red,
      violet: primitives.Violet,
      teal: primitives.Teal,
    },
    semantic: {
      primary: {
        weak: darkSemantic.Primary?.Weak || "#c2410c",
        subdued: darkSemantic.Primary?.Subdued || "#f97316",
        moderate: darkSemantic.Primary?.Moderate || "#fb923c",
        strong: darkSemantic.Primary?.Strong || "#fdba74",
      },
      neutral: {
        weak: darkSemantic.Neutral?.Weak || "#71717a",
        subdued: darkSemantic.Neutral?.Subdued || "#a1a1aa",
        moderate: darkSemantic.Neutral?.Moderate || "#d4d4d8",
        strong: darkSemantic.Neutral?.Strong || "#f4f4f5",
        "600": "#52525b",
      },
      surface: {
        base: darkSemantic.Surface?.Base || "#0f0f10",
        low: darkSemantic.Surface?.Low || "#1d1d21",
        mid: darkSemantic.Surface?.Mid || "#29292e",
        high: darkSemantic.Surface?.High || "#3e3e47",
        translucent: {
          low: darkSemantic.Surface?.Translucent?.Low || "rgba(255, 255, 255, 0.05)",
          mid: darkSemantic.Surface?.Translucent?.Mid || "rgba(255, 255, 255, 0.1)",
          high: darkSemantic.Surface?.Translucent?.High || "rgba(255, 255, 255, 0.2)",
        }
      },
      info: {
        weak: darkSemantic.Info?.Weak || "#1d4ed8",
        subdued: darkSemantic.Info?.Subdued || "#3b82f6",
        moderate: darkSemantic.Info?.Moderate || "#60a5fa",
        strong: darkSemantic.Info?.Strong || "#93c5fd",
      },
      success: {
        weak: darkSemantic.Success?.Weak || "#166534",
        subdued: darkSemantic.Success?.Subdued || "#16a34a",
        moderate: darkSemantic.Success?.Moderate || "#22c55e",
        strong: darkSemantic.Success?.Strong || "#86efac",
      },
      warning: {
        weak: darkSemantic.Warning?.Weak || "#ca8a04",
        subdued: darkSemantic.Warning?.Subdued || "#facc15",
        moderate: darkSemantic.Warning?.Moderate || "#fde047",
        strong: darkSemantic.Warning?.Strong || "#fef08a",
      },
      danger: {
        weak: darkSemantic.Danger?.Weak || "#991b1b",
        subdued: darkSemantic.Danger?.Subdued || "#dc2626",
        moderate: darkSemantic.Danger?.Moderate || "#ef4444",
        strong: darkSemantic.Danger?.Strong || "#f87171",
      },
      stroke: {
        "neutral-translucent-weak": darkSemantic.Stroke?.Neutral?.Translucent?.Weak || "rgba(255, 255, 255, 0.1)",
        "neutral-translucent-subdued": darkSemantic.Stroke?.Neutral?.Translucent?.Subdued || "rgba(255, 255, 255, 0.2)",
        "neutral-translucent-moderate": darkSemantic.Stroke?.Neutral?.Translucent?.Moderate || "rgba(255, 255, 255, 0.3)",
        "neutral-translucent-strong": darkSemantic.Stroke?.Neutral?.Translucent?.Strong || "rgba(255, 255, 255, 0.6)",
      }
    }
  },
  spacing,
  borderRadius,
  typography: {
    fonts: {
      sans: ["Inter", "sans-serif"]
    },
    sizes: {
      xs: ["12px", { lineHeight: "1.375", letterSpacing: "0.3px" }],
      sm: ["14px", { lineHeight: "1.5" }],
      base: ["16px", { lineHeight: "1.5" }],
      lg: ["18px", { lineHeight: "1.5" }],
      xl: ["30px", { lineHeight: "1.25", letterSpacing: "-1px" }]
    }
  }
}

// Write tokens.json
const tokensPath = path.join(__dirname, '../design-tokens/tokens.json')
fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2))
console.log('✅ tokens.json updated')

// Write theme files
const darkThemePath = path.join(__dirname, '../design-tokens/themes/dark.json')
const lightThemePath = path.join(__dirname, '../design-tokens/themes/light.json')

const darkThemeTokens = {
  colors: {
    surface: {
      base: lightSemantic.Surface?.Base || "#d4d4d8",
      low: lightSemantic.Surface?.Low || "#e4e4e7",
      mid: lightSemantic.Surface?.Mid || "#f4f4f5",
      high: lightSemantic.Surface?.High || "#fafafa",
    },
    neutral: {
      strong: lightSemantic.Neutral?.Strong || "#1d1d21",
      moderate: lightSemantic.Neutral?.Moderate || "#3e3e47",
      subdued: lightSemantic.Neutral?.Subdued || "#52525b",
    }
  }
}

const lightThemeTokens = {
  colors: {
    surface: {
      base: lightSemantic.Surface?.Base || "#d4d4d8",
      low: lightSemantic.Surface?.Low || "#e4e4e7",
      mid: lightSemantic.Surface?.Mid || "#f4f4f5",
      high: lightSemantic.Surface?.High || "#fafafa",
    },
    neutral: {
      strong: lightSemantic.Neutral?.Strong || "#1d1d21",
      moderate: lightSemantic.Neutral?.Moderate || "#3e3e47",
      subdued: lightSemantic.Neutral?.Subdued || "#52525b",
    }
  }
}

fs.writeFileSync(darkThemePath, JSON.stringify({
  colors: {
    surface: {
      base: darkSemantic.Surface?.Base || "#0f0f10",
      low: darkSemantic.Surface?.Low || "#1d1d21",
      mid: darkSemantic.Surface?.Mid || "#29292e",
      high: darkSemantic.Surface?.High || "#3e3e47",
    },
    neutral: {
      strong: darkSemantic.Neutral?.Strong || "#f4f4f5",
      moderate: darkSemantic.Neutral?.Moderate || "#d4d4d8",
      subdued: darkSemantic.Neutral?.Subdued || "#a1a1aa",
    }
  }
}, null, 2))

fs.writeFileSync(lightThemePath, JSON.stringify(lightThemeTokens, null, 2))
console.log('✅ Theme files updated')

console.log('✅ All tokens processed successfully!')

