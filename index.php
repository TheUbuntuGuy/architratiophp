<html>
    <head>
        <meta charset="UTF-8">
        <title>ZFS ARC Hit Ratio Monitor</title>
        <style type="text/css">
            h1, p {
                font-family: 'Helvetica', 'Arial', sans-serif;
                margin: 5px 5px 5px 5px;
            }
            
            #copyright {
                position: absolute;
                bottom: 5px;
                right: 5px;
                width: 350px;
                height: 25px;
            }
        </style>
    </head>
    <body>
        <h1>ARC Hit Ratio</h1>
        <canvas id="arcChart" width="1750" height="400"></canvas>
        <h1>L2ARC Hit Ratio</h1>
        <canvas id="l2arcChart" width="1750" height="400"></canvas>
        <div id="copyright">Copyright &copy; 2016 Mark Furneaux, Romaco Canada</div>
    </body>
    <script src="js/jquery-2.2.2.min.js"></script>
    <script src="js/Chart.min.js"></script>
    <script src="js/arc.js"></script>
</html>
