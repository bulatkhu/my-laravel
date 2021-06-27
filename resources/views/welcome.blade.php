<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap" rel="stylesheet">

    </head>
    <body>
        <div id="app">
            <app></app>
        </div>
    </body>
    <script>
        window._asset = '{{ asset('') }}';
    </script>
    <script src="{{ mix("js/app.js") }}"></script>
{{--    <script src="{{ mix('js/svg.js') }}"></script>--}}
</html>
