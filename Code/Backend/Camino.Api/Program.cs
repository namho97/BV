using Camino.Api.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseIISIntegration();

//Add services to the application and configure service provider
builder.Services.ConfigureApplicationServices(builder);

//// Add services to the container.
//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();




var app = builder.Build();

app.ConfigureRequestPipeline();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

app.OnStart();
app.Run();
