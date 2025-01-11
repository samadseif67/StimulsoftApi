using Stimulsoft.Base;

var builder = WebApplication.CreateBuilder(args);

//StiLicense.Key = "YOUR_LICENSE_KEY";  

//*******************************************************************

IWebHostEnvironment env = builder.Environment;
var contentRoot = env.ContentRootPath;
var licensefile = System.IO.Path.Combine(contentRoot, "Reports", "license.key");
//Stimulsoft.Base.StiLicense.LoadFromFile(licensefile);

//*******************************************************************


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
