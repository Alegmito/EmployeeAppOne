using Microsoft.EntityFrameworkCore;
using EmployeeAppOne.Models;
using EmployeeAppOne.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add db context
builder.Services.AddDbContext<EmployeeAppContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("EmployeeAppContext")));

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

// create database if one doesn't exist initialize with content
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<EmployeeAppContext>();
    context.Database.EnsureCreated();
    DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
