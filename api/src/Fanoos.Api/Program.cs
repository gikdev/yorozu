using System.Text.Json.Serialization;
using Fanoos.Api.Extensions;
using Fanoos.Api.Middleware;
using Fanoos.Common.Endpoints;
using Fanoos.Infrastructure;
using Scalar.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

builder.Services.ConfigureHttpJsonOptions(o => {
    o.SerializerOptions.NumberHandling = JsonNumberHandling.Strict;
});
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddFanoosInfrastructure(configuration);

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.ApplyMigrations();
}

app.UseExceptionHandler();
app.MapEndpoints(app.MapGroup("/api"));
app.MapOpenApi();
app.MapOpenApi("/openapi.yaml");
app.MapScalarApiReference();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

await app.RunAsync();
