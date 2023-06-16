using Camino.Api.CustomMiddleware;
using Camino.Services.InitialData;

namespace Camino.Api.Infrastructure.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static void ConfigureRequestPipeline(this WebApplication app)
        {

            //Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("CorsPolicy");
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseMiddleware<CustomExceptionMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            //app.MapControllers();

            //var jwtConfig = app.ApplicationServices.GetService(typeof(JwtConfig)) as JwtConfig;
            //app.UseHangfireDashboard("/hangfire", new DashboardOptions
            //{
            //    Authorization = new[] { new HangfireAuthorizationFilter(jwtConfig?.SecretKey) }
            //});
            //HangfireScheduler.ConfigureRecurringJobs();

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapHealthChecks("/health");
            //});
        }

        public static void OnStart(this WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var initService = services.GetRequiredService<IInitialService>();
                    initService.DummyData();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError($"An error occurred while seeding the database: {ex}");
                }
            }
        }
    }
}
