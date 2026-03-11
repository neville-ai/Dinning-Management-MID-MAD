import { ThemeProvider } from "@/hooks/useTheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import React from "react";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL as string
);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
