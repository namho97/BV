﻿using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Camino.Core.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        ///     [Dependency Injection]
        /// </summary>
        /// <param name="services">          </param>
        /// <param name="systemName">
        ///     Ex: Monkey =&gt; scan for Monkey.dll and Monkey.*.dll
        /// </param>
        /// <param name="assemblyFolderPath">
        ///     Default is null = current execute application folder
        /// </param>
        public static IServiceCollection AddDependencyInjection(this IServiceCollection services, string systemName, string? assemblyFolderPath = null)
        {
            services
                .AddDependencyInjectionScanner()
                .ScanFromAllAssemblies($"{systemName}.dll", assemblyFolderPath)
                .ScanFromAllAssemblies($"{systemName}.*.dll", assemblyFolderPath);

            // Write out all dependency injection services
            services.WriteOut(systemName);

            //Resolver.Services = services;

            return services;
        }

        public static IServiceCollection AddDependencyInjectionScanner(this IServiceCollection services)
        {
            services.AddSingleton<Scanner>();

            //Resolver.Services = services;

            return services;
        }

        ///// <summary>
        /////     Register in self assembly
        ///// </summary>
        ///// <param name="services"></param>
        ///// <returns></returns>
        //public static IServiceCollection ScanFromSelf(this IServiceCollection services)
        //{
        //    var env = services.BuildServiceProvider().GetService<IHostingEnvironment>();
        //    services.ScanFromAssembly(new AssemblyName(env.ApplicationName));

        //    //Resolver.Services = services;

        //    return services;
        //}

        /// <summary>
        ///     Register Assembly by Name
        /// </summary>
        /// <param name="services">    </param>
        /// <param name="assemblyName"></param>
        public static IServiceCollection ScanFromAssembly(this IServiceCollection services, AssemblyName assemblyName)
        {
            var scanner = services.GetScanner();
            scanner.RegisterAssembly(services, assemblyName);

            //Resolver.Services = services;

            return services;
        }

        /// <summary>
        ///     Register all assemblies
        /// </summary>
        /// <param name="services">      </param>
        /// <param name="searchPattern">  Search Pattern by Directory.GetFiles </param>
        /// <param name="folderFullPath"> Default is null = current execute application folder </param>
        public static IServiceCollection ScanFromAllAssemblies(this IServiceCollection services, string searchPattern = "*.dll", string? folderFullPath = null)
        {
            var scanner = services.GetScanner();
            scanner.RegisterAllAssemblies(services, searchPattern, folderFullPath);

            //Resolver.Services = services;

            return services;
        }

        /// <summary>
        ///     Write registered service information to Console
        /// </summary>
        /// <param name="services">             </param>
        /// <param name="serviceTypeNameFilter"> ServiceType.Name.Contains([filter string]) </param>
        public static IServiceCollection WriteOut(this IServiceCollection services, string? serviceTypeNameFilter = null)
        {
            var scanner = services.GetScanner();
            scanner.WriteOut(services, serviceTypeNameFilter);

            //Resolver.Services = services;

            return services;
        }

        private static Scanner GetScanner(this IServiceCollection services)
        {
            var scanner = services.BuildServiceProvider().GetService<Scanner>();
            if (scanner == null)
            {
                throw new InvalidOperationException($"Unable to resolve {nameof(Scanner)}. Did you forget to call {nameof(services)}.{nameof(AddDependencyInjectionScanner)}?");
            }
            return scanner;
        }
    }
}