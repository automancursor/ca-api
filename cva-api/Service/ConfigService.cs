using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using cva_api.Data;
using cva_api.Model;
using Microsoft.EntityFrameworkCore;

namespace cva_api.Service
{
    public class ConfigService : IConfigService
    {
        SqlContext db;
        public ConfigService(SqlContext _db)
        {
            this.db = _db;
        }
        public async Task<double?> GetConfigdoubleValue(string Name)
        {
            if (db == null)
            {
                return null;
            }
            var result = await db.Configs.FirstOrDefaultAsync(x => x.Name == Name);
            if (result == null)
            {
                return null;
            }
            var value = (string)result.Value;
            return double.Parse(value);
        }

        public async Task<int?> GetConfigIntValue(string Name)
        {
            if (db == null)
            {
                return null;
            }
            var result = await db.Configs.FirstOrDefaultAsync(x => x.Name == Name);
            if (result == null)
            {
                return null;
            }
            var value = (string)result.Value;
            return int.Parse(value);
        }

        public async Task<List<Config>> GetConfigs()
        {
            if (db == null)
            {
                return null;
            }
            return await db.Configs.ToListAsync();
        }
        

        public async Task<List<MediaConfig>> GetMediaConfigs()
        {
            if (db == null)
            {
                return null;
            }
            return await db.MediaConfigs.ToListAsync();
        }

        public async Task<string> GetConfigStringValue(string Name)
        {
            if (db == null)
            {
                return null;
            }
            var result = await db.Configs.FirstOrDefaultAsync(x => x.Name == Name);
            if (result == null)
            {
                return null;
            }
            var value = (string)result.Value;
            return value;
        }
        public async Task<MediaConfig> AddMediaConfig(MediaConfig mediaConfig)
        {
            if (db != null)
            {
                await this.db.MediaConfigs.AddAsync(mediaConfig);
                await db.SaveChangesAsync();
                return mediaConfig;
            }
            return null;
        }
        public async Task<int> UpdateMediaConfig(MediaConfig MediaConfig)
        {
            if (db != null)
            {
                var result = await db.MediaConfigs.AsNoTracking().FirstOrDefaultAsync(x => x.Name == MediaConfig.Name);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.MediaConfigs.Update(MediaConfig);
                Type type = typeof(MediaConfig);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(MediaConfig, null) == null)
                    {
                        entry.Property(property.Name).IsModified = false;
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> UpdateConfig(Config config)
        {
            if (db != null)
            {
                var result = await db.Configs.AsNoTracking().FirstOrDefaultAsync(x => x.Name == config.Name);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.Configs.Update(config);
                Type type = typeof(Config);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(config, null) == null)
                    {
                        entry.Property(property.Name).IsModified = false;
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<Config> AddConfig(Config config)
        {
            if (db == null)
            {
                return null;
            }
            await db.Configs.AddAsync(config);
            await db.SaveChangesAsync();
            return config;
        }
    }
}