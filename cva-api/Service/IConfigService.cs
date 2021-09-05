using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;

namespace cva_api.Service
{
    public interface IConfigService
    {
        Task<double?> GetConfigdoubleValue(string Name);
        Task<string?> GetConfigStringValue(string Name);
        Task<int?> GetConfigIntValue(string Name);
        Task<List<Config>> GetConfigs();
        Task<Config> AddConfig(Config config);
        Task<List<MediaConfig>> GetMediaConfigs();
        Task<MediaConfig> AddMediaConfig(MediaConfig mediaConfig);
        Task<int> UpdateConfig(Config config);
        Task<int> UpdateMediaConfig(MediaConfig MediaConfig);
    }
}