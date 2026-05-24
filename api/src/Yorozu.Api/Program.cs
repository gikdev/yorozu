using System.Text.Json.Serialization;
using Yorozu.Api.Extensions;
using Yorozu.Api.Middleware;
using Yorozu.Common.Endpoints;
using Yorozu.Infrastructure;
using Scalar.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

builder.Services.ConfigureHttpJsonOptions(o => {
    o.SerializerOptions.NumberHandling = JsonNumberHandling.Strict;
});
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddYorozuInfrastructure(configuration);

WebApplication app = builder.Build();

// Note: Used to be in "dev" mode only, but since it's a personal project, and is used locally, it auto applies migrations...
app.ApplyMigrations();
// if (app.Environment.IsDevelopment()) {
//     app.ApplyMigrations();
// }

app.UseExceptionHandler();
app.MapEndpoints(app.MapGroup("/api"));
app.MapOpenApi();
app.MapOpenApi("/openapi.yaml");
app.MapScalarApiReference();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

await app.RunAsync();
