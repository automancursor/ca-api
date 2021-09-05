# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0.103 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY cva-api/*.csproj ./cva-api/
RUN dotnet restore

# copy everything else and build app
COPY cva-api/. ./cva-api/

WORKDIR /source/cva-api
RUN dotnet restore

# EF migration
# Explicitly ask for path to be added
ENV PATH="${PATH}:/root/.dotnet/tools"
RUN dotnet tool install --global dotnet-ef
## RUN dotnet ef database drop --force
RUN dotnet ef database update


RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app ./
COPY ["./cva.pfx", "/https/cva.pfx"]
ENTRYPOINT ["dotnet", "cva-api.dll"]