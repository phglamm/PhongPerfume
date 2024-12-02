using Microsoft.EntityFrameworkCore;
using PhongPerfume.Data;
using PhongPerfume.Interface;
using PhongPerfume.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IBrandRepository, BrandRepository>(); // For scoped lifetime
builder.Services.AddScoped<IEventRepository, EventRepository>(); // For scoped lifetime
builder.Services.AddScoped<IOrderDetailPerfumeRepository, OrderDetailPerfumeRepository>(); // For scoped lifetime
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>(); // For scoped lifetime
builder.Services.AddScoped<IOrderRepository, OrderRepository>(); // For scoped lifetime
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>(); // For scoped lifetime
builder.Services.AddScoped<IPerfumeRepository, PerfumeRepository>(); // For scoped lifetime
builder.Services.AddScoped<IWarrantyRepository, WarrantyRepository>(); // For scoped lifetime
builder.Services.AddScoped<IUserRepository, UserRepository>();


var app = builder.Build();
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowSpecificOrigins", policy =>
//    {
//        policy.WithOrigins("https://example.com", "https://another.com") // Specify allowed origins
//              .AllowAnyHeader()  // Allow all headers
//              .AllowAnyMethod(); // Allow all HTTP methods (GET, POST, etc.)
//    });

//    options.AddPolicy("AllowAll", policy =>
//    {
//        policy.AllowAnyOrigin() // Allow any origin
//              .AllowAnyHeader()
//              .AllowAnyMethod();
//    });
//});
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
