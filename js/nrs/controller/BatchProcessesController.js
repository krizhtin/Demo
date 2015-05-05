angular.module('mainSystemModule')
    .controller('BatchSchedulerShowController', ['$scope', '$state', function ($scope, $state) {
            $scope.pageInfo = {// Default Page Info
                last: true,
                totalPages: 0,
                totalElements: 0,
                size: 10,
                number: 0,
                numberOfElements: 0,
                first: true
            };

            $scope.filterValue = ""; // DEFAULT Filter Value
            $scope.$watch('filterValue', function (newValue, oldValue) { // On Filter Value Change
                console.log(newValue, oldValue);
            });

            $scope.filterColumn = "username"; // DEFAULT Filter Column Dropdown
            $scope.$watch('filterColumn', function (newValue, oldValue) { // On Filter Column Change
                console.log(newValue, oldValue);
            });

            $scope.search = {// Default Sorting Values
                username: "",
            };

            $scope.filter = {// Default Sorting Values
                sortColumn: "username",
                sortType: "asc"
            };

            $scope.perPageList = [// Default Table Paging Options
                {text: "10 Per Page", value: 10},
                {text: "20 Per Page", value: 20},
                {text: "30 Per Page", value: 30}
            ];

            $scope.columns = [// Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
                { label: "Task ID", field: "taskID"},
                { label: "Task Name", field: "taskName"},
                { label: "Process Job", field: "processJob"},
                { label: "Timing Schedule", field: "timingSchedule"},
                { label: "Days", field: "days"},
                { label: "Start Date", field: "startDate"},
                { label: "Finish Date", field: "finishDate"},
                { label: "Status", field: "status"},
            ];

            $scope.data = [
                {
                    id: 1,
                    taskID: 'Task123',
                    taskName: 'Task One Two Three',
                    processJob: 'Task123 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
                {
                    id: 2,
                    taskID: 'Task234',
                    taskName: 'Task Two Three Four',
                    processJob: 'Task234 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
                {
                    id: 3,
                    taskID: 'Task345',
                    taskName: 'Task Three Four Five',
                    processJob: 'Task345 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
                {
                    id: 4,
                    taskID: 'Task456',
                    taskName: 'Task Four Five Six',
                    processJob: 'Task456 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
                {
                    id: 5,
                    taskID: 'Task567',
                    taskName: 'Task Five Six Seven',
                    processJob: 'Task567 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
                {
                    id: 6,
                    taskID: 'Task678',
                    taskName: 'Task Six Seven Eight',
                    processJob: 'Task678 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
                {
                    id: 7,
                    taskID: 'Task789',
                    taskName: 'Task Seven Eight Nine',
                    processJob: 'Task789 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
                {
                    id: 8,
                    taskID: 'Task890',
                    taskName: 'Task Eight Nine Zero',
                    processJob: 'Task890 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
                {
                    id: 9,
                    taskID: 'Task901',
                    taskName: 'Task Nine Zero One',
                    processJob: 'Task901 Process Job',
                    timingSchedule: '2015-09-21 12:30:00',
                    days: 5,
                    startDate: '2015-04-15',
                    finishDate: '2015-05-15',
                    status: 'Active'
                },
            ];
            function refreshGrid() { // Refresh Table Data
                
            }

            $scope.bdoTable = {
                row: {// Table Row Buttons
                    view: function (index, row) {
                        $state.go('batch-scheduler.view', {
                            id: row.id
                        });
                    },
                    edit: function (index, row) {
                        $state.go('batch-scheduler.edit', {
                            id: row.id
                        });
                    },
                    delete: function (index, row) {
                        if (confirm('Are you sure you want to delete this?'))
                            $scope.data.splice(index, 1);
                    }
                },
                pagination: {// Table Paginations
                    next: function () {
                        if ($scope.pageInfo.number < $scope.pageInfo.totalPages - 1) {
                            $scope.pageInfo.number++;
                            refreshGrid()
                        }
                    },
                    previous: function () {
                        if ($scope.pageInfo.number != 0) {
                            $scope.pageInfo.number--;
                            refreshGrid()
                        }
                    },
                    page: function (page) {
                        $scope.pageInfo.number = page - 1;
                        refreshGrid();
                    },
                    perPage: function (perPage) {
                        $scope.pageInfo.size = perPage;
                        refreshGrid();
                    }
                },
                sort: function (field) { // Table Sorting
                    if ($scope.filter.sortColumn != field) {
                        $scope.filter = {
                            sortColumn: field,
                            sortType: "asc"
                        }
                    }
                    else {
                        $scope.filter.sortType = $scope.filter.sortType == "asc" ? "desc" : "asc";
                    }
                    refreshGrid();
                }
            };

            refreshGrid();
        }])
    .controller('BatchSchedulerNewController', ['$scope', function ($scope) {
            $scope.task = {
                filesInformation: []
            };

            $scope.back = function () {
                $state.go('batch-scheduler');
            };

            $scope.newFileFolderInformation = function () {
                $scope.task.filesInformation.push({});
            };
            $scope.removeFileInformation = function (index) {
                $scope.task.filesInformation.splice(index, 1);
            };
            $scope.save = function () {
                console.log($scope.task);
            };
        }])
    .controller('BatchSchedulerEditController', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
            $scope.formTitle = 'Edit Batch Schedule'
            
            $scope.task = {
                id: 'AD432',
                status: 'Active',
                processJob: 'jflkasjd',
                name: 'Task AD432',
                preRequisiteTask: 'fdasf',
                requirePrerequisite: true,
                numFiles: 5,
                reportFolder: 'fjlkdasjf',
                schedule: {
                    timing: 'Daily',
                    days: [
                        'Monday',
                        'Tuesday',
                        'Wednesday'
                    ],
                    startDate: '2015-04-29',
                    endDate: '2015-05-01',
                    startTime: '12:12:12',
                    allowSnooze: true,
                    recheckTimes: 5,
                    frequency: 15 // in minutes
                },
                filesInformation: [
                    {
                        host: 'files.zoogtech.com',
                        path: '/folder/path',
                        username: 'zoogtech',
                        password: 'zoog101'
                    }
                ]
            };

            $scope.back = function () {
                $state.go('batch-scheduler');
            };

            $scope.newFileFolderInformation = function () {
                $scope.task.filesInformation.push({});
            };
            $scope.removeFileInformation = function (index) {
                $scope.task.filesInformation.splice(index, 1);
            };
            $scope.save = function () {
                console.log($scope.task);
            };
        }])
    .controller('BatchSchedulerDetailsController', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
            $scope.formTitle = 'Batch Schedule Details'
            $scope.back = function () {
                $state.go('batch-scheduler');
            };
            angular.forEach($scope.data, function (value, index) {
                if (value.id == $stateParams.id)
                    $scope.task = value;
            });
        }])
    ;