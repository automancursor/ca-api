## Run / Debug
Before running the project, you will need to add two user-secret values. The values are stored in [Azure access keys].
- `cd src/app`
- `dotnet user-secrets set "AzureAppConfig:ClientId" "{id}"` replace `{id}` with the `id` access key value.
- `dotnet user-secrets set "AzureAppConfig:Secret" "{secret}"` replace `{secret}` with the `secret` access key value.

After running the above commands you can verify the secrets have been added by viewing the created `secrets.json` file.

**Windows**
`%APPDATA%\Microsoft\UserSecrets\31ee228d-4e27-43e2-aa92-ae16f50c8c39\secrets.json`

**Mac**
`~/.microsoft/usersecrets/31ee228d-4e27-43e2-aa92-ae16f50c8c39/secrets.json`

### VS Code
From the "Run" tab, select the `API` launch config and hit "Start debugging". This will launch the application on `https://localhost:5001`.

The app launch config and tasks are set in the `launch.json` and `tasks.json` under `.vscode` folder.

## Build the docker container
Note: These instructions may be outdated? If you have run the application in a Docker container, please update these instructions.

To run the container in debug mode:

```docker-compose -f debug.yml up --build```

Access the API @ https://localhost:5001/api/{controller}
Access the Swagger spec @ https://localhost:5001/swagger

#### Hot reload

When running in debug mode, the container supports file watching and will automatically rebuild whenever you save changes to the source code.

## Build for Release

TODO

## Test

To build for test:
```dotnet build api.sln```

To execute unit tests (with coverage):
```dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover```

## Docker

change `ConnectionStrings.Default.server` in  `./cva-api/appsettings.json`  to `host.docker.internal` to connect your local mysql db

```
docker build -t cva-api .
```

```
docker run -p 5001:80 cva-api
```



## Mysql

mysql5.7
```
server=127.0.0.1;
user=root;
password=root;
database=cva_v2;
port=3306
```


Hangfire 
=========

[![Official Site](https://img.shields.io/badge/site-hangfire.io-blue.svg)](http://hangfire.io) [![Latest version](https://img.shields.io/nuget/v/Hangfire.svg)](https://www.nuget.org/packages?q=hangfire) [![License LGPLv3](https://img.shields.io/badge/license-LGPLv3-green.svg)](http://www.gnu.org/licenses/lgpl-3.0.html)

## Build Status

&nbsp; | `master` | `dev`
--- | --- | --- 
**Windows** | [![Windows Build Status](https://ci.appveyor.com/api/projects/status/70m632jkycqpnsp9/branch/master?svg=true)](https://ci.appveyor.com/project/odinserj/hangfire-525)  | [![Windows Build Status](https://ci.appveyor.com/api/projects/status/70m632jkycqpnsp9/branch/dev?svg=true)](https://ci.appveyor.com/project/odinserj/hangfire-525) 
**Linux / OS X** | [![Travis CI Build Status](https://travis-ci.org/HangfireIO/Hangfire.svg?branch=master)](https://travis-ci.org/HangfireIO/Hangfire) | [![Linux and OS X Build Status](https://travis-ci.org/HangfireIO/Hangfire.svg?branch=dev)](https://travis-ci.org/HangfireIO/Hangfire)

## Overview

Incredibly easy way to perform **fire-and-forget**, **delayed** and **recurring jobs** inside **ASP.NET applications**. CPU and I/O intensive, long-running and short-running jobs are supported. No Windows Service / Task Scheduler required. Backed by Redis, SQL Server, SQL Azure and MSMQ.

Hangfire provides a unified programming model to handle background tasks in a **reliable way** and run them on shared hosting, dedicated hosting or in cloud. You can start with a simple setup and grow computational power for background jobs with time for these scenarios:

- mass notifications/newsletters
- batch import from xml, csv or json
- creation of archives
- firing off web hooks
- deleting users
- building different graphs
- image/video processing
- purging temporary files
- recurring automated reports
- database maintenance
- *…and so on*

Hangfire is a .NET Framework alternative to [Resque](https://github.com/resque/resque), [Sidekiq](http://sidekiq.org), [delayed_job](https://github.com/collectiveidea/delayed_job), [Celery](http://www.celeryproject.org).

![Hangfire Dashboard](http://hangfire.io/img/ui/dashboard-sm.png)

Installation
-------------

Hangfire is available as a NuGet package. You can install it using the NuGet Package Console window:

```
PM> Install-Package Hangfire
```

After installation, update your existing [OWIN Startup](http://www.asp.net/aspnet/overview/owin-and-katana/owin-startup-class-detection) file with the following lines of code. If you do not have this class in your project or don't know what is it, please read the [Quick start](http://docs.hangfire.io/en/latest/quick-start.html) guide to learn about how to install Hangfire.

```csharp
public void Configuration(IAppBuilder app)
{
    GlobalConfiguration.Configuration.UseSqlServerStorage("<connection string or its name>");
    
    app.UseHangfireServer();
    app.UseHangfireDashboard();
}
```

Usage
------

This is an incomplete list of features; to see all of them, check the [official site](http://hangfire.io) and the [documentation](http://docs.hangfire.io).

[**Fire-and-forget tasks**](http://docs.hangfire.io/en/latest/background-methods/calling-methods-in-background.html)

Dedicated worker pool threads execute queued background jobs as soon as possible, shortening your request's processing time.

```csharp
BackgroundJob.Enqueue(() => Console.WriteLine("Simple!"));
```

[**Delayed tasks**](http://docs.hangfire.io/en/latest/background-methods/calling-methods-with-delay.html)

Scheduled background jobs are executed only after a given amount of time.

```csharp
BackgroundJob.Schedule(() => Console.WriteLine("Reliable!"), TimeSpan.FromDays(7));
```

[**Recurring tasks**](http://docs.hangfire.io/en/latest/background-methods/performing-recurrent-tasks.html)

Recurring jobs have never been simpler; just call the following method to perform any kind of recurring task using the [CRON expressions](http://en.wikipedia.org/wiki/Cron#CRON_expression).

```csharp
RecurringJob.AddOrUpdate(() => Console.WriteLine("Transparent!"), Cron.Daily);
```

**Continuations**

Continuations allow you to define complex workflows by chaining multiple background jobs together.

```csharp
var id = BackgroundJob.Enqueue(() => Console.WriteLine("Hello, "));
BackgroundJob.ContinueWith(id, () => Console.WriteLine("world!"));
```

**Process background tasks inside a web application…**

You can process background tasks in any OWIN-compatible application framework, including [ASP.NET MVC](http://www.asp.net/mvc), [ASP.NET Web API](http://www.asp.net/web-api), [FubuMvc](http://fubu-project.org), [Nancy](http://nancyfx.org), etc. Forget about [AppDomain unloads, Web Garden & Web Farm issues](http://haacked.com/archive/2011/10/16/the-dangers-of-implementing-recurring-background-tasks-in-asp-net.aspx/) – Hangfire is reliable for web applications from scratch, even on shared hosting.

```csharp
app.UseHangfireServer();
```

**… or anywhere else**

In console applications, Windows Service, Azure Worker Role, etc.

```csharp
using (new BackgroundJobServer())
{
    Console.WriteLine("Hangfire Server started. Press ENTER to exit...");
    Console.ReadLine();
}
```

Questions? Problems?
---------------------

Open-source projects develop more smoothly when discussions are public.

If you have any questions, problems related to Hangfire usage or if you want to discuss new features, please visit the [discussion forum](http://discuss.hangfire.io). You can sign in there using your existing Google or GitHub account, so it's very simple to start using it.

If you've discovered a bug, please report it to the [Hangfire GitHub Issues](https://github.com/HangfireIO/Hangfire/issues?state=open). Detailed reports with stack traces, actual and expected behaviours are welcome.

Related Projects
-----------------

Please see the [Extensions](http://hangfire.io/extensions.html) page on the official site.

Building the sources
---------------------

Prerequisites:
* [Razor Generator](https://marketplace.visualstudio.com/items?itemName=DavidEbbo.RazorGenerator): Required if you intend to edit the cshtml files.
* Install the MSMQ service (Microsoft Message Queue Server), if not already installed.

Then, create an environment variable with Variable name `Hangfire_SqlServer_ConnectionStringTemplate` and put your connection string in the Variable value field. Example:

* Variable name: `Hangfire_SqlServer_ConnectionStringTemplate`
* Variable value: `Data Source=.\sqlexpress;Initial Catalog=Hangfire.SqlServer.Tests;Integrated Security=True;`

To build a solution and get assembly files, just run the following command. All build artifacts, including `*.pdb` files, will be placed into the `build` folder. **Before proposing a pull request, please use this command to ensure everything is ok.** Btw, you can execute this command from the Package Manager Console window.

```
build
```

To build NuGet packages as well as an archive file, use the `pack` command as shown below. You can find the result files in the `build` folder.

```
build pack
```

To see the full list of available commands, pass the `-docs` switch:

```
build -docs
```

Hangfire uses [psake](https://github.com/psake/psake) build automation tool. All psake tasks and functions defined in `psake-build.ps1` (for this project) and `psake-common.ps1` (for other Hangfire projects) files. Thanks to the psake project, they are very simple to use and modify!

Razor templates are compiled upon save with the [Razor Generator Visual Studio extension](https://marketplace.visualstudio.com/items?itemName=DavidEbbo.RazorGenerator).  You will need this installed if you want to modify the Dashboard UI.

