using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using TinyPoker.Core.Services;
using TinyPoker.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();


builder.Services.AddTransient<IRoomService, RoomDbService>();

var MyAllowSpecificOrigins = "corsapp";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:44498",
                                             "http://tiny-poker.fun",
                                             "http://www.tiny-poker.fun",
                                             "https://tiny-poker.fun",
                                             "https://www.tiny-poker.fun",
                                             "http://tinypoker-dev.eba-cptk2fsu.us-east-1.elasticbeanstalk.com",
                                             "http://tinypoker-dev.eba-cptk2fsu.us-east-1.elasticbeanstalk.com/")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials();
                      });
});

var awsOptions = builder.Configuration.GetAWSOptions();
builder.Services.AddDefaultAWSOptions(awsOptions);
builder.Services.AddAWSService<IAmazonDynamoDB>();
builder.Services.AddScoped<IDynamoDBContext, DynamoDBContext>();

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());
//builder.Services.AddCors(p => p.AddPolicy(MyAllowSpecificOrigins, builder =>
//{
//    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
//}));

var app = builder.Build();
app.MapHub<ChatHub>("/api/chat");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
