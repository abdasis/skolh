<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Default SEO meta tags (overridden per-page via Inertia Head) --}}
        <meta name="description" content="SDIT Al-Aziz - Sekolah Dasar Islam Terpadu. Pendidikan berkualitas berbasis nilai-nilai Islam untuk generasi unggul.">
        <meta name="robots" content="index, follow">

        {{-- Open Graph defaults --}}
        <meta property="og:site_name" content="{{ config('app.name', 'SDIT Al-Aziz') }}">
        <meta property="og:locale" content="id_ID">
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ config('app.name', 'SDIT Al-Aziz') }} - Sekolah Dasar Islam Terpadu">
        <meta property="og:description" content="Pendidikan berkualitas berbasis nilai-nilai Islam untuk generasi unggul.">

        {{-- Twitter Card defaults --}}
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="{{ config('app.name', 'SDIT Al-Aziz') }} - Sekolah Dasar Islam Terpadu">
        <meta name="twitter:description" content="Pendidikan berkualitas berbasis nilai-nilai Islam untuk generasi unggul.">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
