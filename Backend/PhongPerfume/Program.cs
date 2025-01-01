using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PhongPerfume.Data;
using PhongPerfume.Interface;
using PhongPerfume.Repository;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IBrandRepository, BrandRepository>(); // For scoped lifetime
builder.Services.AddScoped<IEventRepository, EventRepository>(); // For scoped lifetime
builder.Services.AddScoped<IOrderItemsRepository, OrderItemsRepository>(); // For scoped lifetime
builder.Services.AddScoped<IOrderRepository, OrderRepository>(); // For scoped lifetime
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>(); // For scoped lifetime
builder.Services.AddScoped<IPerfumeRepository, PerfumeRepository>(); // For scoped lifetime
builder.Services.AddScoped<IWarrantyRepository, WarrantyRepository>(); // For scoped lifetime
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddCors(options =>
{
    //options.AddPolicy("AllowSpecificOrigins", policy =>
    //{
    //    policy.WithOrigins("https://example.com", "https://another.com") // Specify allowed origins
    //          .AllowAnyHeader()  // Allow all headers
    //          .AllowAnyMethod(); // Allow all HTTP methods (GET, POST, etc.)
    //});

    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin() // Allow any origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
    //options.AddPolicy("AllowFrontend", policy =>
    //{
    //    policy.WithOrigins("http://localhost:5173") // Replace with your frontend URL
    //          .AllowAnyHeader()
    //          .AllowAnyMethod();
    //});

});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Put in JWT as follow: Bearer {token}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile("keys/serviceAccountKey.json")
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
