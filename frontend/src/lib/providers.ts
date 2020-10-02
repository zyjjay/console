export enum ProviderID {
    GCP = 'gcp',
    AWS = 'aws',
    AZR = 'azr',
    VMW = 'vmw',
    BMC = 'bmc',
    UKN = 'unknown',
}

interface Provider {
    name: string
    key: ProviderID
}

export const providers: Provider[] = [
    { key: ProviderID.GCP, name: 'Google Cloud Platform' },
    { key: ProviderID.AWS, name: 'Amazon Web Services' },
    { key: ProviderID.AZR, name: 'Microsoft Azure' },
    { key: ProviderID.VMW, name: 'VMware vSphere' },
    { key: ProviderID.BMC, name: 'Bare-Metal' },
]

export function getProvider(name: string): Provider {
    const provider = providers.find((provider) => provider.name === name)
    if (provider) return provider
    return { key: ProviderID.UKN, name: 'Unknown' }
}

export function getProviderByKey(key: ProviderID): Provider {
    const provider = providers.find((provider) => provider.key === key)
    if (provider) return provider
    return { key: ProviderID.UKN, name: 'Unknown' }
}

export enum KubernetesPlatform {
    AKS = 'aks',
    EKS = 'eks',
    GKE = 'gke',
    OCP = 'ocp',
    UKN = 'Unknown',
}
